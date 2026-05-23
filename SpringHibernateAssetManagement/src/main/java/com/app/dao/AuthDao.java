package com.app.dao;

import com.app.model.Admin;

public interface AuthDao {

    Admin login(String name,String password);
}