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
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST')
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
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET, POST')
            self.end_headers()
            self.wfile.write(resp.read())
            logging.info(f'Request URI: {self.path}, Response code: {resp.status}')
        except Exception as e:
            logging.error(f'Error: {str(e)}')
            logging.error(f'Equivalent curl command: curl -X POST -d {post_data} http://localhost:20000{path}')

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
            
if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    http.server.HTTPServer(('0.0.0.0', 30000), Proxy).serve_forever()