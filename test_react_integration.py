import urllib.request
import json
import sys

base = 'http://127.0.0.1:8000'

def run():
    print("[1] Testing Root Path (React SPA)...")
    req = urllib.request.Request(base + "/", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as r:
        assert r.status == 200, f"Expected 200, got {r.status}"
        body = r.read().decode('utf-8')
        assert '<div id="root"></div>' in body, "Missing #root"
        assert 'assets/index-' in body, "Missing assets/index-"
        print("    -> PASS: React index.html served with root mount point.")

    print("[2] Testing JS Asset Fetch...")
    # Find the js bundle path in HTML
    import re
    match = re.search(r'src="(/assets/index-[^"]+\.js)"', body)
    assert match, "Could not find JS asset link in HTML"
    js_url = base + match.group(1)
    with urllib.request.urlopen(js_url) as r:
        assert r.status == 200, f"Expected 200, got {r.status}"
        js_content = r.read()
        assert len(js_content) > 1000, "JS asset too small"
        print(f"    -> PASS: JS Bundle {match.group(1)} fetched ({len(js_content):,} bytes).")

    print("[3] Testing CSS Asset Fetch...")
    match_css = re.search(r'href="(/assets/index-[^"]+\.css)"', body)
    assert match_css, "Could not find CSS asset link in HTML"
    css_url = base + match_css.group(1)
    with urllib.request.urlopen(css_url) as r:
        assert r.status == 200, f"Expected 200, got {r.status}"
        css_content = r.read()
        assert len(css_content) > 1000, "CSS asset too small"
        print(f"    -> PASS: CSS Bundle {match_css.group(1)} fetched ({len(css_content):,} bytes).")

    print("[4] Testing Python Business Tier Health Endpoint...")
    with urllib.request.urlopen(base + '/api/health') as r:
        data = json.loads(r.read().decode('utf-8'))
        assert data.get('status') == 'healthy', "Health check failed"
        print(f"    -> PASS: Health check healthy (DB Engine: {data.get('db_engine')}).")

    print("[5] Testing Python Catalog Endpoint...")
    with urllib.request.urlopen(base + '/api/products') as r:
        data = json.loads(r.read().decode('utf-8'))
        products = data.get('products', [])
        assert len(products) >= 10, f"Expected at least 10 products, got {len(products)}"
        print(f"    -> PASS: Product catalog returned {len(products)} products from SQLite database.")

    print("[6] Testing Secrets Info Endpoint...")
    with urllib.request.urlopen(base + '/api/system/secrets-info') as r:
        resp = json.loads(r.read().decode('utf-8'))
        info = resp.get('data', {})
        assert info.get('secrets_file_loaded') is True, "secrets_file_loaded was not True"
        print(f"    -> PASS: Secrets file verified ({info.get('database_parameters', {}).get('engine')}).")

    print("[7] Testing SPA Fallback Route (/bespoke-studio)...")
    with urllib.request.urlopen(base + '/bespoke-studio') as r:
        assert r.status == 200
        spa_body = r.read().decode('utf-8')
        assert '<div id="root"></div>' in spa_body
        print("    -> PASS: Client-side routing fallback serves React entrypoint.")

    print("\n==========================================")
    print("ALL 7 VERIFICATION CHECKS PASSED PERFECTLY!")
    print("==========================================")

if __name__ == "__main__":
    run()
