#!/usr/bin/env bash
# Fork-only: apt-get install for fork-windows-desktop.yml. On 2026-11-11 GitHub runners could
# not resolve the Ubuntu archives (azure.archive.ubuntu.com, ports.ubuntu.com) while other
# hosts resolved, so a failed install retries against other Ubuntu mirrors.
#
#   scripts/fork-apt-install.sh libsecret-1-dev pkg-config
set -euo pipefail

if [[ "$(dpkg --print-architecture)" == "amd64" ]]; then
  mirrors=(http://mirrors.edge.kernel.org/ubuntu http://mirror.leaseweb.com/ubuntu)
else
  mirrors=(http://mirror.leaseweb.com/ubuntu-ports http://ftp.tu-chemnitz.de/pub/linux/ubuntu-ports)
fi
apt_options=(-q -o Acquire::Retries=3 -o Acquire::http::Timeout=20 -o Acquire::https::Timeout=20)

install() {
  sudo apt-get "${apt_options[@]}" update && sudo apt-get "${apt_options[@]}" install -y "$@"
}

install "$@" && exit 0
for mirror in "${mirrors[@]}"; do
  echo "::warning::apt install failed; retrying with $mirror"
  # Runner images list the archive in a mirror file and in deb822 or legacy sources.
  [[ -f /etc/apt/apt-mirrors.txt ]] && echo "$mirror" | sudo tee /etc/apt/apt-mirrors.txt >/dev/null
  [[ -f /etc/apt/sources.list.d/ubuntu.sources ]] &&
    sudo sed -i -E "s#^URIs:.*#URIs: $mirror#" /etc/apt/sources.list.d/ubuntu.sources
  [[ -f /etc/apt/sources.list ]] &&
    sudo sed -i -E "s#^(deb(-src)? (\[[^]]*\] )?)(mirror\+file:[^ ]+|https?://[^ /]*ubuntu\.com/[^ ]*)#\1$mirror#" /etc/apt/sources.list
  install "$@" && exit 0
done
echo "apt install failed on every mirror" >&2
exit 1
