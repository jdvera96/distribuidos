use db_polylost;

select * from usuario;
select * from categoria;
select * from subcategoria;
select * from objeto;

alter table objeto drop foreign key fk_objeto_categoria1;
ALTER TABLE objeto CHANGE idcategoria idsubcategoria int;
ALTER TABLE objeto ADD FOREIGN KEY (idsubcategoria) REFERENCES subcategoria(idsubcategoria);

Update objeto Set idsubcategoria=3 Where idobjeto=4;
