Rails.application.routes.draw do

  root to: 'notes#create_or_find_last_note'
  devise_for :users

  resources :notes, only: %i[update index destroy edit new create]

  get '/taggings', to: 'taggings#index', as: 'taggings'
  post '/taggings/:id', to: 'taggings#create', as: 'create_tagging'
  delete '/taggings/:id', to: 'taggings#destroy', as: 'delete_tagging'

  resources :folders, only: [:index, :show, :create, :destroy] do
    resources :notes, only: %i[new create]
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
