package com.todolist.springmysql.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.todolist.springmysql.model.Item;
import com.todolist.springmysql.repository.ItemRepository;

@RestController
@RequestMapping({"/items"})
@CrossOrigin(origins = "http://localhost:8080")
public class ItemController {

	@Autowired
	private ItemRepository repository;
	
	public ItemController(ItemRepository itemRepository) {
		this.repository = itemRepository;
	}
	
	@Configuration
	public class CorsConfiguration implements WebMvcConfigurer {

	    @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**")
	            .allowedOrigins("http://localhost:3000")
	            .allowedMethods("GET", "POST", "PUT", "DELETE");
	    }
	}
	
	//métodos crud
	
	@GetMapping
	@CrossOrigin(origins = "http://localhost:8080")
	public List findAll(){
	   return repository.findAll();
	}
	
	@PostMapping
	public Item create(@RequestBody Item item){
	   return repository.save(item);
	}
	
	@PutMapping(value="/{id}")
	public ResponseEntity update(@PathVariable("id") long id,
	                                      @RequestBody Item item) {
	   return repository.findById(id)
	           .map(record -> {
	               record.setTexto(item.getTexto());
	               record.setStatus(item.getStatus());
	               Item updated = repository.save(record);
	               return ResponseEntity.ok().body(updated);
	           }).orElse(ResponseEntity.notFound().build());
	}
	
	@PutMapping(value="/status/{id}")
	public ResponseEntity updateStatus(@PathVariable("id") long id,
	                                      @RequestBody Item item) {
	   return repository.findById(id)
	           .map(record -> {
	               record.setStatus(item.getStatus());
	               Item updated = repository.save(record);
	               return ResponseEntity.ok().body(updated);
	           }).orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping(path ={"/{id}"})
	public ResponseEntity <?> delete(@PathVariable long id) {
	   return repository.findById(id)
	           .map(record -> {
	               repository.deleteById(id);
	               return ResponseEntity.ok().build();
	           }).orElse(ResponseEntity.notFound().build());
	}

}
