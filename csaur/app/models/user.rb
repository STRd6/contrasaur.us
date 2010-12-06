class User < ActiveRecord::Base
  acts_as_authentic do |config|
    config.validate_email_field = false
    config.validate_login_field = false
    config.validate_password_field = false
  end

  def payment_status
    # TODO Maybe use these?
    access_token_scope = "https://www.googleapis.com/auth/chromewebstore.readonly"
    oauth_signature_method = "HMAC-SHA1"

    consumer_key = "anonymous"
    consumer_secret = "anonymous"

    app_id = CHROME_APP_CONFIG["app_id"]
    oauth_token_secret = CHROME_APP_CONFIG["oauth_token_secret"]
    oauth_token = CHROME_APP_CONFIG["oauth_token"]

    client = Signet::OAuth1::Client.new(
      :client_credential_key => consumer_key,
      :client_credential_secret => consumer_secret,
      :token_credential_key => oauth_token,
      :token_credential_secret => oauth_token_secret
    )

    token = get_token(:openid).key

    # a test user, from http://code.google.com/chrome/webstore/docs/check_for_payment.html#test
    free_trial_user_identity = 'https://www.google.com/accounts/o8/id?id=AItOawlh_ZYIBQi-kNV-d3Rd8WIjQEBsLDh5LDQ'

    # a test user, from http://code.google.com/chrome/webstore/docs/check_for_payment.html#test
    full_access_user_identity = 'https://www.google.com/accounts/o8/id?id=AItOawmWpkMt_qJRVRQfIlJ32TZnW1mmzYbjWeI'

    openid_uri = Signet::OAuth1.encode(token)
    request_uri =  'https://www.googleapis.com/chromewebstore/v1/licenses/'+app_id+'/'+openid_uri

    response = client.fetch_protected_resource(
      :uri => request_uri
    )

    status, headers, body = response

    user_app_data = JSON.parse(body.first)

    if user_app_data["result"] == "YES"
      user_app_data["accessLevel"]
    else
      user_app_data["result"]
    end
  end

  def has_full_version?
    payment_status == "FULL"
  end
end
