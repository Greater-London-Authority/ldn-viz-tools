export const oauth_config = {
	app_name: 'OAuth Demo',
	client_id: 'vis-apps',
	redirect_uri: 'http://localhost:5173/',
	authorization_endpoint: 'https://example.com/realms/dev-city-data/protocol/openid-connect/auth',
	token_endpoint: 'https://example.com/realms/dev-city-data/protocol/openid-connect/token',
	requested_scopes: 'profile',
	logout_endpoint:
		'https://keycloack.ldn-gis.co.uk/realms/dev-city-data/protocol/openid-connect/logout',
	role_name: 'app-example-user',
	post_login_url: './'
};
