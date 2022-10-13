require "application_system_test_case"

class TiersTest < ApplicationSystemTestCase
  setup do
    @tier = tiers(:one)
  end

  test "visiting the index" do
    visit tiers_url
    assert_selector "h1", text: "Tiers"
  end

  test "creating a Tier" do
    visit tiers_url
    click_on "New Tier"

    fill_in "Batch hash", with: @tier.batch_hash
    fill_in "Benefits", with: @tier.benefits
    fill_in "Contract hash", with: @tier.contract_hash
    fill_in "Exclusive", with: @tier.exclusive
    fill_in "From", with: @tier.from
    fill_in "Link", with: @tier.link
    fill_in "Name", with: @tier.name
    fill_in "Page", with: @tier.page_id
    fill_in "To", with: @tier.to
    click_on "Create Tier"

    assert_text "Tier was successfully created"
    click_on "Back"
  end

  test "updating a Tier" do
    visit tiers_url
    click_on "Edit", match: :first

    fill_in "Batch hash", with: @tier.batch_hash
    fill_in "Benefits", with: @tier.benefits
    fill_in "Contract hash", with: @tier.contract_hash
    fill_in "Exclusive", with: @tier.exclusive
    fill_in "From", with: @tier.from
    fill_in "Link", with: @tier.link
    fill_in "Name", with: @tier.name
    fill_in "Page", with: @tier.page_id
    fill_in "To", with: @tier.to
    click_on "Update Tier"

    assert_text "Tier was successfully updated"
    click_on "Back"
  end

  test "destroying a Tier" do
    visit tiers_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Tier was successfully destroyed"
  end
end
