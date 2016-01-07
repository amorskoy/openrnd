# OpenR&D - researched material indexer and recommeder

Main purpose of this tool is to serve distributed R&D departments  
Anyone reading interesting Web article can push it to Open R&D  
Inside Open R&D article is indexed, tags and features extracted, clusters determined  
Whenever you start your research - you can search in Open R&D,  using tags, clusters and fulltext/fuzzy search.
Possible option is to create cluster/tag based subscriptions.

Components:  
* Chrome extension - lets you select text and send it to Open R&D with context menu item 'Send to Open RnD'  
* Listener - python daemon accepting data from chrome. It saves data to ElasticSearch and into CSV for further processing  
* Search engine - ElasticSearch based interface to search articles by fulltext and tags/clusters.  
* ML engine - Spark based feature extraction engine  

