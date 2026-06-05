from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 375, "height": 812})

    page.goto('http://localhost:5175/GrMine-Docs/ui/ui-getting-started')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='d:/tmp/mobile-debug1.png', full_page=True)

    # Check if menu button exists and is visible
    menu_btn = page.locator('.menu-toggle')
    print(f"Menu button count: {menu_btn.count()}")
    if menu_btn.count() > 0:
        print(f"Menu button visible: {menu_btn.is_visible()}")
        print(f"Menu button enabled: {menu_btn.is_enabled()}")
        box = menu_btn.bounding_box()
        print(f"Menu button box: {box}")

    # Check sidebar wrapper
    wrapper = page.locator('.sidebar-wrapper')
    print(f"Sidebar wrapper count: {wrapper.count()}")
    if wrapper.count() > 0:
        print(f"Sidebar wrapper HTML: {wrapper.evaluate('el => el.outerHTML.substring(0, 200)')}")

    # Check for gm-sidebar
    sidebar = page.locator('.gm-sidebar')
    print(f"Sidebar count: {sidebar.count()}")

    # Check body/html background
    bg = page.evaluate("getComputedStyle(document.body).backgroundColor")
    print(f"Body background: {bg}")

    # Try clicking
    if menu_btn.count() > 0 and menu_btn.is_visible():
        menu_btn.click(force=True)
        page.wait_for_timeout(500)
        page.screenshot(path='d:/tmp/mobile-debug2.png', full_page=True)
        print("After click screenshot saved")

    browser.close()
