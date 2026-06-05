from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 375, "height": 812})

    page.goto('http://localhost:5175/GrMine-Docs/ui/ui-getting-started')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='d:/tmp/mobile-fix1.png', full_page=True)

    # Click menu button
    menu_btn = page.locator('.menu-toggle')
    menu_btn.click()
    page.wait_for_timeout(500)
    page.screenshot(path='d:/tmp/mobile-fix2.png', full_page=True)

    # Check sidebar is visible
    sidebar = page.locator('.gm-sidebar')
    print(f"Sidebar visible: {sidebar.is_visible()}")

    browser.close()
