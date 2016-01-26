#!/bin/bash

curl -XDELETE "http://127.0.0.1:9200/articles/article/$1"
