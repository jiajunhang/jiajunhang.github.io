---
title: "Understanding Database Indexes"
excerpt_separator: "<!--more-->"
categories:
  - Blog
tags:
  - database
  - index
  - sql
---

Today we will explore the world of database indexes. I was inspired to learn more about how database indexes work as I have come to realize how deep the topic goes, and how the devil is really in the details when it comes down to optimizating database query performance. Without forming a solid understanding of how they operate, there is no way we could possibly work on actually optimizing real world systems.

# 1 What is a database index?

## 1.1 The simplistic view - it just makes search faster
Back when I was a software engineer that had just graduated, a database index to me was simply a handy thing I could use to speed up SQL queries going from my application to the database. 

`"Need to query something fast from a huge table? Just add an index on that column."`

It is a simplistic and naive view of a much more complicated process that is invisible to application developers. I recall being asked about how I could speed up data access to a given table in an interview and I gave the straightforward answer of adding an index on the column of interest. 

The interviewer then asked about the tradeoffs or cost of adding indexes and I was not able to respond. At that point, I clearly did not understand a single thing about how a database index worked, and I have taken it for granted that it is the silver bullet that will resolve our engineering woes of improving application performance at no cost.

`"If there are no downsides to using it, what is stopping us from adding an index to all columns on our database?"`

 In that perfect world, all database queries would be fast and there would be no optimizations required. Clearly, there is no free lunch in the world. In that moment, I began to understand that there are tradeoffs to every design decision you make.

## 1.2 A structure designed to improve performance but at a cost
Building an index has real tangible costs. 

Without diving too deep into the technical details now, most MySQL database index are created as a tree structure, specifically the B-Tree or B+Tree. From our data structure classes, we know that balanced search trees can speed up the process of a search from `O(N)` in the case of a linear search, to `O(logN)`. That is the premise behind the performance gain we observe from indexing a frequently-searched column.

Once we start thinking about it in a leetcode-ish fashion, it becomes obvious that there are trade-offs we need to think about when deciding whether or not to build an index for that column. (um, space and time complexity?!)

Creating an index on every column of your table means that there will be that many number of B-trees to be stored and maintained. For huge tables, that will take up additional storage resources. More importantly, what happens when you continue to write data into the table? Naturally, the index will need to account for that new row of data by rebalancing itself which takes time, effectively slowing down our writes.

Simply put, although it helps to speed up our DB queries significantly, it can also **negatively impact on write performance on top of other considerations regarding storage constraints**. These are important implications that we need to understand as engineers to avoid creating or worsening performance problems by administering the incorrect or suboptimal solution.





# 2 How are tables stored?
In the process of understanding how an index works, it is important for us to know how our database tables are stored. Unsurprisingly, these also vary depending on the type of database or database engine you are using, so for this post, the discussion will be based on InnoDB, the default database engine for MySQL databases.

All InnoDB indexes are B+tree data structures (with the exception of spatial indexes). We will take a look at what clustered and non-clustered indexes are, which are essentially the core of how data is stored in an InnoDB database. In the process, we will also take a look at visualizations of the B+tree structure to better understand why it is actually faster to retrieve information through these structures.

## 2.1 Clustered index (or primary index)
In an InnoDB table, all row data are by default stored in a special index called the clustered index. When we create a table in InnoDB, the primary key will be used to form the clustered index.

Below is an illustration of how a B+ tree looks like. 

![B+ Trees](/assets/images/databases/b-plus-tree.png)

All nodes are a page which is essentially a unit of data record. Visualization was generated from [https://www.cs.usfca.edu/](https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html).

For **root and intermediate nodes**, it stores **keys and pointers to child nodes**. Note that it does not contain any row data, so we are able to fit more keys/pointer in each node (as opposed to a B-tree which stores actual data in non-leaf nodes).

For **leaf nodes**, we store the **actual records along with a pointer to the next node**. Having pointers to the next node is also another benefit of a B+ tree as opposed to the B-tree in enabling faster range queries.

The clustered index essentially forms the entirety of our table. Without creating any other index, any queries will therefore scan through this structure which is why finding a row using the primary key is extremely fast, and finding one using a non-primary key could be very slow.


## 2.2 Non-clustered index (or secondary index)
A non-clustered index or secondary index is not too different from a primary index.

The only difference lies in the fact that **leaf nodes now do not store records**, but **only the key of the secondary index and clustered key**. 

Let's look at what this means in practice. Suppose we have a table with the following schema:

```
User {
  `id` int(11) UNIQUE NOT NULL,
  `username` varchar(16) UNIQUE NOT NULL,
  `firstName` varchar(32),
  `lastName` varchar(32),
  PRIMARY KEY (`id`)
  KEY (`username`)
}
```

If we execute the query:

```
SELECT * from User WHERE username = "ABC"
```
The database engine will parse this query and develop an optimized execution plan. Given that there is an index on username, it has decided to search the secondary index for "ABC". Upon finding "ABC" in the secondary index, it will also have the corresponding cluster key (id, which is the primary key). 

Notice that because we did a SELECT *, the query is also requesting for the column information for first name and last name. As a result, it now has to search through the cluster index to retrieve the full row data.

It is therefore important when writing application-level code to understand what are the exact fields required to fulfill the business logic that you are implementing. Although it might seem trivial, it is actually much more effective to select only the columns you require, **especially if the value is already covered in the secondary index**.


# 3 Summary
The research into the inner workings of database indexes has made me realize how much more there is to learn. There are many nuanced differences in the implementation of how data is stored, and how they are indexed depending on the type of database and database engine you are working on. There are many brilliant engineers who have contributed to this space which has enabled us to gain access to the plethora of database technologies available today. 

Nonetheless, the concepts and foundation are the same. Some key things I will start to ask myself from now:

Do I understand the cost of having built an index, and whether or not my application is able to afford this cost. How can I achieve a balanced tradeoff to ensure maximum performance?

After having built an index, am I using it effectively? Have I written queries in my application code that are able to take full advantage of the the index? Should I consider adding a composite index instead?


