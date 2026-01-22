import http.server
import socketserver
import webbrowser
import os

PORT = 8000

# Change directory to the script's directory (where index.html is)
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        webbrowser.open(f"http://localhost:{PORT}")
        httpd.serve_forever()
except OSError as e:
    if e.errno == 98 or e.errno == 10048: # Address already in use
        print(f"Port {PORT} is already in use. Please try a different port or close the application using it.")
    else:
        raise e
except KeyboardInterrupt:
    print("\nServer stopped.")
