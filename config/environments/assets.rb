Rails.application.configure do
  # Precompile with no connection to db
  config.cache_classes = true
  config.eager_load = false

  # static files
  config.public_file_server.enabled = true

  # Assets
  config.assets.compile = true
  config.assets.digest = true

  # Dummy Secret key base (just to rails start)
  config.secret_key_base = "dummy_secret_for_assets_precompile"

  config.log_level = :warn
end
