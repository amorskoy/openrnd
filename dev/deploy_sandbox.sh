#!/bin/bash

SB_BASE="/opt/sandbox/es_work"
SB_DIR="${SB_BASE}/openrnd"
SB_RUN="python ${SB_DIR}/listener/listener.py"
SRC_DIR="/var/www/openrnd"

rm -rf $SB_DIR
cp -r ${SRC_DIR} ${SB_DIR}
