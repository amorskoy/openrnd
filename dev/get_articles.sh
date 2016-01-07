#!/bin/bash

curl -XGET 'http://127.0.0.1:9200/articles/article/_search?q=*&pretty=true'
