Rails.application.routes.draw do

  root to: 'pages#greeting'
  devise_for :users

  resources :notes, only: %i[create update index delete]
  resources :folders, only: [:index, :show, :create, :delete]
  resources :taggings, only: [:index, :create, :delete]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
