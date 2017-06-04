package com.example.inventory;

import com.example.inventory.model.Item;
import com.example.inventory.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;

/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
@RestController
@RequestMapping("/inventory")
public class InventoryManager {
    @Autowired
    private ItemRepository itemRepository;

    @RequestMapping(value = "/addItem", method = RequestMethod.POST)
    public String addItem(@RequestBody Item item) throws URISyntaxException{
        Item newItem = new Item();
        newItem.setName(item.getName());
        newItem.setPrice(item.getPrice());
        newItem.setQuantity(item.getQuantity());
        newItem.setDescription(item.getDescription());
        newItem.setOutofstock(item.isOutofstock());

        if(!findName(item.getName())) {
            this.itemRepository.save(newItem);
            return "Saved";
        }else {
            return "Item exist please update";
        }
    }

    @RequestMapping(value = "/updateItem", method = RequestMethod.POST)
    public String updateItem(@RequestBody Item item) throws URISyntaxException{
        Item newItem = new Item();
        newItem.setName(item.getName());
        newItem.setPrice(item.getPrice());
        newItem.setQuantity(item.getQuantity());
        newItem.setDescription(item.getDescription());
        newItem.setOutofstock(item.isOutofstock());

        if(findName(item.getName())) {
            this.itemRepository.save(newItem);
            return "Saved";
        }else {
            return "Item doesn't exist please add";
        }
    }

    @RequestMapping(value = "/findAllItems", method = RequestMethod.GET)
    public String finditems(){
        String result = "<html>";

        for(Item item : itemRepository.findAll()){
            result += "<div>" + item.toString() + "</div>";
        }

        return result + "</html>";
    }

    public boolean findName(String name){
       Item item = itemRepository.findByName(name);
        if(item.getName() != null){
            System.out.print(item.getName());
            return true;
        }
        return false;
    }
}

