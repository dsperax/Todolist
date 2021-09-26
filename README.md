# Todolist

### Ferramentas utilizadas:

- MySQL;
- Spring Framework no Back-End;
- Maven;
- Persistencia de dados com Hibernate;
- Front end em React.JS.

### Execução: 

- Configure a conexão com o banco na API (src/main/resources/application.properties);

```
## Spring DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/todolist?useSSL=false
spring.datasource.username=**YOURUSERNAMEHERE**
spring.datasource.password=**YOURPASSWORDHERE**
spring.jpa.hibernate.ddl-auto=update

# Dialeto SQL melhorar o SQL gerado pelo Hibernate
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5Dialect
```

- Execute a query de criação da tabela no MySQL:

```
CREATE TABLE `todolist`.`item` (
  `id` INT NOT NULL,
  `texto_item` VARCHAR(500) NOT NULL,
  `status_item` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
COMMENT = 'TABELA REFERENTE AOS ITENS DA LISTA.';
```

- Execute o front na pasta my-app com o comando:

```
npm -start
```
