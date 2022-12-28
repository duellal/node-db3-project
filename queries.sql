-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
select
    productname, 
    c.categoryname
from product as p
join category as c
    on p.categoryid = c.id

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
select  
    id, 
    shipname
from order
where orderdate > '2012-09-08'

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
select
    p.ProductName,
    od.Quantity,
    od.orderid
from product as p
join orderdetail as od
    on p.id = od.ProductId
where od.orderid = 10251
order by p.productname

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.

select 
    od.orderid,
    c.companyname as customerCompanyName,
    e.lastname as employeeLastName
from order as o
join employee as e
    on o.employeeid = e.id
join orderdetail as od
    on od.orderid = o.id
join customer as c
    on c.id = o.customer
