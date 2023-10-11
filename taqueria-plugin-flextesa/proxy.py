import http.server
import http.client
import urllib
import logging
class Proxy(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        self.log_request()
        conn = http.client.HTTPConnection('localhost', 20000)
        path = self.path
        try:
            conn.request('GET', urllib.parse.unquote(path))
            resp = conn.getresponse()
            self.send_response(resp.status)
            self.end_headers()
            self.wfile.write(resp.read())
            logging.info(f'Request URI: {self.path}, Response code: {resp.status}')
        except Exception as e:
            logging.error(f'Error: {str(e)}')
            logging.error(f'Equivalent curl command: curl -X GET http://localhost:20000{path}')
    def do_POST(self):
        self.log_request()
        conn = http.client.HTTPConnection('localhost', 20000)
        path = self.path
        length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(length)
        try:
            conn.request('POST', urllib.parse.unquote(path), body=post_data)
            resp = conn.getresponse()
            self.send_response(resp.status)
            self.end_headers()
            self.wfile.write(resp.read())
            logging.info(f'Request URI: {self.path}, Response code: {resp.status}')
        except Exception as e:
            logging.error(f'Error: {str(e)}')
            logging.error(f'Equivalent curl command: curl -X POST -d {post_data} http://localhost:20000{path}')
if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    http.server.HTTPServer(('0.0.0.0', 30000), Proxy).serve_forever()
