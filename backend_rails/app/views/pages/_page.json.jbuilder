json.extract! page, :id, :name, :markdown, :owner_address, :link, :created_at, :updated_at
json.url page_url(page, format: :json)
