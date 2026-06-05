from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    # Mobile viewport
    page = browser.new_page(viewport={"width": 375, "height": 812})

    # Doc page
    page.goto('http://localhost:5175/GrMine-Docs/ui/ui-getting-started')
    page.wait_for_load_state('networkidle')
    page.screenshot(path='d:/tmp/mobile-before.png', full_page=True)
    print("Mobile before click saved")

    # Click menu button
    menu_btn = page.locator('.menu-toggle')
    if menu_btn.is_visible():
        menu_btn.click()
        page.wait_for_timeout(500)
        page.screenshot(path='d:/tmp/mobile-after.png', full_page=True)
        print("Mobile after click saved")
    else:
        print("Menu button not visible!")

    browser.close()
