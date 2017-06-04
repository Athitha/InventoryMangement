package com.example.inventory.repository;

import com.example.inventory.model.Item;
import org.springframework.data.repository.CrudRepository;


import java.util.List;

/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
public interface ItemRepository extends CrudRepository<Item,Long> {

    public Item findByName(String name);
}
