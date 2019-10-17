## Basic endpoints:

### Posts

`GET /api/v1/posts` - get array of all posts

`GET /api/v1/posts/:id` - get single post data

`POST /api/v1/posts` - create new post

- Params:<br>`post: { title: String, body: String }`
- Permissions:<br>
  `admin` required

`PATCH /api/v1/posts/:id` - update post

- Params:<br>`post: { title: String, body: String }`
- Permissions:<br>
  `admin` or `owner` required

`DELETE /api/v1/posts/:id` - delete post

- Permissions:<br>
  `admin` required

### Comments

`GET /api/v1/posts/:post_id/comments` - get array of all comments associated with post

`POST /api/v1/posts/:post_id/comments` - create new comment

- Params:<br>`comment: { body: String }`
- Permissions:<br>
  `user` required

`DELETE /api/v1/posts/:post_id/comments/:id` - delete comment

- Permissions:<br>
  `admin` or `owner` required

### Concerts

`GET /api/v1/concerts` - get array of all concerts

`GET /api/v1/concerts/:id` - get single concert data

`POST /api/v1/concerts` - create new concert

- Params:<br>`concert: { name: String, description: String }`
- Permissions:<br>
  `admin` required

`PATCH /api/v1/concerts/:id` - update concert

- Params:<br>`concert: { name: String, description: String }`
- Permissions:<br>
  `admin` required

`DELETE /api/v1/concerts/:id` - delete concert

- Permissions:<br>
  `admin` required

### Events

`GET /api/v1/events` - get array of all events

`GET /api/v1/events/:id` - get single event data

`POST /api/v1/events` - create new event

- Params:<br>`event: { place: String, starts_at: DateTime, estimated_length: Integer }, concert_id: Integer`
- Permissions:<br>
  `admin` required

`PATCH /api/v1/events/:id` - update event

- Params:<br>`event: { place: String, starts_at: DateTime, estimated_length: Integer }`
- Permissions:<br>
  `admin` required

`DELETE /api/v1/events/:id` - delete event

- Permissions:<br>
  `admin` required

### Reviews

`GET /api/v1/reviews` - get array of all reviews

`POST /api/v1/reviews` - create new review

- Params:<br>`review: { title: String, body: String, rate: Integer }, event_id: Integer`
- Permissions:<br>
  `user` required

`PATCH /api/v1/reviews/:id` - update review

- Params:<br>`review: { title: String, body: String, rate: Integer }`
- Permissions:<br>
  `admin` or `owner` required

`DELETE /api/v1/reviews/:id` - delete review

- Permissions:<br>
  `admin` required

### Tickets

`GET /api/v1/tickets` - get array of all tickets

`POST /api/v1/tickets` - book tickets

- Params:<br>`tickets: Array[Integer]`
- Permissions:<br>
  `user` required
