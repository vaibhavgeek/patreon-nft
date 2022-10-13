require "test_helper"

class TiersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tier = tiers(:one)
  end

  test "should get index" do
    get tiers_url
    assert_response :success
  end

  test "should get new" do
    get new_tier_url
    assert_response :success
  end

  test "should create tier" do
    assert_difference('Tier.count') do
      post tiers_url, params: { tier: { batch_hash: @tier.batch_hash, benefits: @tier.benefits, contract_hash: @tier.contract_hash, exclusive: @tier.exclusive, from: @tier.from, link: @tier.link, name: @tier.name, page_id: @tier.page_id, to: @tier.to } }
    end

    assert_redirected_to tier_url(Tier.last)
  end

  test "should show tier" do
    get tier_url(@tier)
    assert_response :success
  end

  test "should get edit" do
    get edit_tier_url(@tier)
    assert_response :success
  end

  test "should update tier" do
    patch tier_url(@tier), params: { tier: { batch_hash: @tier.batch_hash, benefits: @tier.benefits, contract_hash: @tier.contract_hash, exclusive: @tier.exclusive, from: @tier.from, link: @tier.link, name: @tier.name, page_id: @tier.page_id, to: @tier.to } }
    assert_redirected_to tier_url(@tier)
  end

  test "should destroy tier" do
    assert_difference('Tier.count', -1) do
      delete tier_url(@tier)
    end

    assert_redirected_to tiers_url
  end
end
