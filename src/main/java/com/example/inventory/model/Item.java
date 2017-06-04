package com.example.inventory.model;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

/**
 * Created by Athitha Anantharamu on 6/4/17.
 */
@Entity
public class Item {

    @Id
    private String name;

    private Integer price;

    private Integer quantity;

    private String description;

    private boolean outofstock;

    public boolean isOutofstock() {
        return outofstock;
    }

    public void setOutofstock(boolean outofstock) {
        this.outofstock = outofstock;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    @Override
    public String toString() {
        return "Item{" +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", description='" + description + '\'' +
                ", outofStock=" + outofstock +
                '}';
    }
}
