from elasticsearch import Elasticsearch

import SocketServer, SimpleHTTPServer
import json,os,sys,csv,codecs, cStringIO

PORT = 9000
csvPath = "/vagrant/es_work/openrnd.csv"

class ServerHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_POST(self):
        global  csvPath

        try:
            content_len = int(self.headers.getheader('content-length', 0))
            body = json.loads(self.rfile.read(content_len))

            dict = {"url" : body['url'], "text" : body['text']}

            es = Elasticsearch()
            es.index(index="articles", doc_type="article", body=dict)

            with open(csvPath,'ab') as fout:
                writer = UnicodeWriter(fout,quoting=csv.QUOTE_ALL)
                writer.writerow(dict.values())


            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write( json.dumps({"result":True}) )

        except Exception, e:

            exc_type, exc_obj, exc_tb = sys.exc_info()
            print(" Type: %s | File: %s | Line number: %s " % (exc_type, os.path.abspath(__file__), exc_tb.tb_lineno))
            print e.message

            self.send_response(500)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write( json.dumps({"result":False}) )


class UnicodeWriter:
    """
    A CSV writer which will write rows to CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        # Redirect output to a queue
        self.queue = cStringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwds)
        self.stream = f
        self.encoder = codecs.getincrementalencoder(encoding)()

    def writerow(self, row):
        self.writer.writerow([s.encode("utf-8") for s in row])
        # Fetch UTF-8 output from the queue ...
        data = self.queue.getvalue()
        data = data.decode("utf-8")
        # ... and reencode it into the target encoding
        data = self.encoder.encode(data)
        # write to the target stream
        self.stream.write(data)
        # empty queue
        self.queue.truncate(0)

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)


if __name__ == '__main__':
    httpd = SocketServer.TCPServer(("", PORT), ServerHandler)

    print "serving at port", PORT
    httpd.serve_forever()