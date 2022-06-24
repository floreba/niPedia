require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get greeting" do
    get pages_greeting_url
    assert_response :success
  end
end
