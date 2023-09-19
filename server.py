import http.server
import socketserver
import webbrowser


# Set the desired port
port = 8000

# Create a simple HTTP server
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", port), Handler) as httpd:
    print(f"Serving at port {port}")
    webbrowser.open("http://localhost:8000")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped by user.")
