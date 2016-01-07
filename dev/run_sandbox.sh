#!/bin/bash

current_path=$(dirname `which $0`)
./${current_path}/deploy_sandbox.sh

SB_BASE="/vagrant/es_work"
SB_DIR="${SB_BASE}/openrnd"
SB_RUN="python ${SB_DIR}/listener/listener.py"


SSH="ssh -i /opt/sandbox/.vagrant/machines/default/virtualbox/private_key -p 2222 vagrant@127.0.0.1"
$SSH "sudo ${SB_RUN}"

