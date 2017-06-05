package com.example.inventory;

import com.example.inventory.model.Item;
import com.example.inventory.model.Response;
import com.example.inventory.repository.ItemRepository;
import com.sun.net.httpserver.Authenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.URIException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
@RestController
@RequestMapping("/inventory")
public class InventoryManager {
    @Autowired
    private ItemRepository itemRepository;

    private Set<String> nameSet = new HashSet<>();

    @RequestMapping(value="/",method = RequestMethod.GET)
    public String homepage(){
        return "index";
    }

    @RequestMapping(value = "/addItem", method = RequestMethod.POST)
    public @ResponseBody
    Response  addItem(@RequestBody Item item) throws URISyntaxException{
        Item newItem = new Item();
        newItem.setName(item.getName());
        newItem.setPrice(item.getPrice());
        newItem.setQuantity(item.getQuantity());
        newItem.setDescription(item.getDescription());
        newItem.setOutofstock(false);

       if(!findName(newItem)) {
            this.itemRepository.save(newItem);
            nameSet.add(item.getName());
           return new Response("ok", "added");
      }else {
           return new Response("error","Item exist, please update");
       }
    }

    @RequestMapping(value = "/updateItem", method = RequestMethod.POST)
    public @ResponseBody
    Response updateItem(@RequestBody Item item) throws URISyntaxException{

        Item newItem = new Item();
            newItem.setName(item.getName());
            newItem.setPrice(item.getPrice());
            newItem.setQuantity(item.getQuantity());
            newItem.setDescription(item.getDescription());
            newItem.setOutofstock(false);

            if(findName(newItem)) {
            this.itemRepository.save(newItem);
            nameSet.add(item.getName());
                return new Response("ok", "updated");
        }else {
                return new Response("error","Item doesn't exist");
            }
    }

    @RequestMapping(value = "/checkout", method = RequestMethod.POST)
    public @ResponseBody Response checkout(@RequestBody Item item) throws URISyntaxException{
        Item newItem = new Item();
        newItem.setName(item.getName());
        newItem.setPrice(item.getPrice());
        if(item.getQuantity() - 1 < 1){
            newItem.setQuantity(0);
            newItem.setDescription(item.getDescription());
            newItem.setOutofstock(true);
        }else{
            newItem.setQuantity(item.getQuantity() - 1);
            newItem.setDescription(item.getDescription());
            newItem.setOutofstock(false);
        }
            this.itemRepository.save(newItem);
            nameSet.add(item.getName());
            return new Response("ok", "checked out");

    }

    @RequestMapping(value = "/removeItem", method = RequestMethod.POST)
    public  @ResponseBody
    Response removeItem(@RequestBody Item item) throws URISyntaxException{

        Item newItem = new Item();
        newItem.setName(item.getName());
        newItem.setQuantity(0);
        newItem.setOutofstock(true);

        if(findName(newItem)) {
            this.itemRepository.save(newItem);
            nameSet.add(item.getName());
            return new Response("ok", "Removed from user view");
        }else {
            return new Response("error","Item doesn't exist");
        }
    }

    @RequestMapping(value = "/findAllItemsAdmin", method = RequestMethod.GET)
    public @ResponseBody
    List<Item> finditemsadmin(){
        List<Item> itemlist = new ArrayList<Item>();

        for(Item item : itemRepository.findAll()){
            if(item.getQuantity() >= 0) {
                nameSet.add(item.getName());
                itemlist.add(item);
            }
        }

        return itemlist;
    }

    @RequestMapping(value = "/findAllItemsUser", method = RequestMethod.GET)
    public @ResponseBody
    List<Item> finditemsuser(){
        List<Item> itemlist = new ArrayList<Item>();

        for(Item item : itemRepository.findAll()){
            if(item.getQuantity() > 0) {
                nameSet.add(item.getName());
                itemlist.add(item);
            }
        }

        return itemlist;
    }
    public Boolean findName(Item item) throws URISyntaxException {

        Item items = this.itemRepository.findOne(item.getName());
        if(items != null){
            return true;
        }else {
            return false;
        }
    }
}

