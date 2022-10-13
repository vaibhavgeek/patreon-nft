require "application_system_test_case"

class PagesTest < ApplicationSystemTestCase
  setup do
    @page = pages(:one)
  end

  test "visiting the index" do
    visit pages_url
    assert_selector "h1", text: "Pages"
  end

  test "creating a Page" do
    visit pages_url
    click_on "New Page"

    fill_in "Link", with: @page.link
    fill_in "Markdown", with: @page.markdown
    fill_in "Name", with: @page.name
    fill_in "Owner address", with: @page.owner_address
    click_on "Create Page"

    assert_text "Page was successfully created"
    click_on "Back"
  end

  test "updating a Page" do
    visit pages_url
    click_on "Edit", match: :first

    fill_in "Link", with: @page.link
    fill_in "Markdown", with: @page.markdown
    fill_in "Name", with: @page.name
    fill_in "Owner address", with: @page.owner_address
    click_on "Update Page"

    assert_text "Page was successfully updated"
    click_on "Back"
  end

  test "destroying a Page" do
    visit pages_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Page was successfully destroyed"
  end
end
