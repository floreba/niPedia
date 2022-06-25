Rails.application.routes.draw do

  root to: 'folders#index'
  devise_for :users

  resources :notes, only: %i[create update index destroy]
  resources :folders, only: [:index, :show, :create, :destroy]
  resources :taggings, only: [:index, :create, :destroy]

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
