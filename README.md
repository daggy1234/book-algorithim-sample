# Reach Best Book Algorithim Determination

The idea was tween friendly book recommendations based on books a tween has probably read!

## ALgorithim

The idea is to effectively recommend books using some parameters. Popular series were used to recommend other books.

- Love For Harry Potter Films/Movies [Love for fantasy] [1-3]
- Love for "fault in our stars" film/movie[YA, realistic] [1-3]
- Love for "to kill a mockingbird" [serious, historic] [1-3] 

Based on the cross product of multiple scores:
  = x\*y + y\*z + z\*z

Then your highest score's product is taken to determine a book from 0-9 of each scale.

### Recommendations

TO be honest I couldn't think of enough books so I gave each score 3 books, minimizing my work to 9 books

#### XY (Harry Potter * Fault in our stars)

Fantasy and Young adult meet. A high score means you love both, and a lower score means a lower appreciation for both but still more than the others.

- 9: Shadowhunters Series (Cassandra Clare)
- 8: Shadowhunters Series (Cassandra Clare)
- 7: Shadowhunters Series (Cassandra Clare)
- 6: The Hunger Games Series (Sussanne Collins)
- 5: The Hunger Games Series (Sussanne Collins)
- 4: The Hunger Games Series (Sussanne Collins)
- 3: Percy Jackson Series (Rick Riordan)
- 2: Percy Jackson Series (Rick Riordan)
- 1: Percy Jackson Series (Rick Riordan)

#### YZ (Fault in our stars * To kill a mockingbird)

Serious, historical classics mixed in with YA themes of romance, gossip and society.

- 9: Pride and prejudice (Jane Austen)
- 8: Pride and prejudice (Jane Austen)
- 7: Pride and prejudice (Jane Austen)
- 6: Little Women (Louis May Alcott)
- 5: Little Women (Louis May Alcott)
- 4: Little Women (Louis May Alcott)
- 3: Great Gatsby (F. Scott Fitzgerald)
- 2: Great Gatsby (F. Scott Fitzgerald)
- 1: Great Gatsby (F. Scott Fitzgerald)

#### XZ (Harry Potter * To kill a mockingbird)

Childish Fantasy meets classics.

- 9: Lord Of the Rings (J. R. R. Tolkien)
- 8: Lord Of the Rings (J. R. R. Tolkien)
- 7: Lord Of the Rings (J. R. R. Tolkien)
- 6: The Chronicles Of Narnia (C.S. Lewis )
- 5: The Chronicles Of Narnia (C.S. Lewis )
- 4: The Chronicles Of Narnia (C.S. Lewis )
- 3: Alice’s Adventures in Wonderland (Lewis Carroll)
- 2: Alice’s Adventures in Wonderland (Lewis Carroll)
- 1: Alice’s Adventures in Wonderland (Lewis Carroll)

#### XY == XZ

Magnitudes are eliminated. This is someone who really loves fantasy, but also loves a mix of classics and YA.

For this case only 1 book: `Circe (Madelline Miller)`

#### XY == YZ 

Love YA but also like fantasy and seriousness (lower extent)

For this case only 1 book: `The Princess Diaries (Meg Cabot)`

#### YZ == XZ

High aptidude for classics paired with a flair for YA and fantasy.

For this case only 1 book: `The Book Thief (Markus Zusak)`

#### YZ == XZ == XY

Super Special Case, which would be hard to recommend. 

For this case only 1 book: ``

## Running Demo

#### Backend

```
cd backend
poetry install
poetry run gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

#### Frontend

```
yarn dev
```


