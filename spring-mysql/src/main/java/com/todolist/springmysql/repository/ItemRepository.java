package com.todolist.springmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todolist.springmysql.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {}