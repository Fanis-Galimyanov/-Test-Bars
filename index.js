const mysql = require('mysql2/promise');
const config = require('./config');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', function(req, res){

async function data_base(){
  const connection = await mysql.createConnection(config);
  let query="SELECT doctors.full_name, doctors.spec, SUM(summ) AS salary"
+ " FROM transactions, doctors"
+ " WHERE transactions.doc_id = doctors.id AND transactions.id IN"
+ "(SELECT transactions.id FROM transactions"
+ " WHERE YEAR(transactions.date) = 2019)"
+ " GROUP BY doctors.id";
  const [rows, fields] = await connection.execute(query);
  return rows;
  connection.end();
}

results = async function (){
    let select_query = await data_base();
    console.log(`ФИО            Специальность     Зарплата`);
    for(let key of select_query.keys()){
      if(select_query[key].salary > 2500){
        console.log(`${select_query[key].full_name}     ${select_query[key].spec}            ${select_query[key].salary}`);
      }
    }
    res.render('index', {select_query: select_query});
};
results();

});
app.listen(3000);
