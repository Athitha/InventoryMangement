package com.example.inventory.repository;

import com.example.inventory.model.Item;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


import java.util.List;

/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
public interface ItemRepository extends CrudRepository<Item,String> {
    @Query("SELECT item.price from Item item where item.name = :name")
    public Integer findByName(@Param("name") String name);
}
