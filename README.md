# Real Estate Platform

A modern property listing platform for buying, selling, and renting real estate properties.

## Entity Relationship Diagram

```mermaid
erDiagram
    users {
        uuid id PK
        string name
        string email
        string role
        datetime created_at
        datetime updated_at
    }
    
    listings {
        uuid id PK
        uuid user_id FK
        string title
        string slug
        text description
        enum listing_type
        enum property_type
        decimal price
        int bedrooms
        int bathrooms
        decimal area_sqm
        int year_built
        int parking_spaces
        int floor
        int total_floors
        enum status
        decimal latitude
        decimal longitude
        string address_line
        string district
        string province
        string postal_code
        string contact_name
        string contact_phone
        string contact_line
        string contact_email
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }
    
    listing_images {
        uuid id PK
        uuid listing_id FK
        string path
        boolean is_cover
        int sort_order
        datetime created_at
        datetime updated_at
    }
    
    amenities {
        uuid id PK
        string name
        datetime created_at
        datetime updated_at
    }
    
    listing_amenities {
        uuid id PK
        uuid listing_id FK
        uuid amenity_id FK
    }
    
    tags {
        uuid id PK
        string name
        enum type
        datetime created_at
        datetime updated_at
    }
    
    listing_tags {
        uuid id PK
        uuid listing_id FK
        uuid tag_id FK
        datetime created_at
        datetime updated_at
    }
    
    favorites {
        uuid id PK
        uuid user_id FK
        uuid listing_id FK
        datetime created_at
        datetime updated_at
    }
    
    users ||--o{ listings : "creates"
    listings ||--o{ listing_images : "has"
    listings ||--o{ listing_amenities : "includes"
    amenities ||--o{ listing_amenities : "belongs_to"
    listings ||--o{ listing_tags : "tagged_with"
    tags ||--o{ listing_tags : "applied_to"
    users ||--o{ favorites : "saves"
    listings ||--o{ favorites : "favorited_by"
```

## Enums

### ListingType
- `sale`
- `rent`

### PropertyType
- `house`
- `condo`
- `townhome`
- `land`

### ListingStatus
- `draft`
- `published`
- `archived`

### TagType
- `general`
- `location`
- `feature`
- `condition`

### UserRole
- `admin`
- `user`
- `vendor`