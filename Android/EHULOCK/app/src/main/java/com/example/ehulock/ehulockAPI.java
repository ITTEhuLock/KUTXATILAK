package com.example.ehulock;

import com.example.ehulock.model.Erreserba;
import com.example.ehulock.model.User;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

import java.util.ArrayList;
import java.util.List;
public interface ehulockAPI {

    @GET("user")
    Call<User> getUser(int userId);

    @GET("erreserba")
    Call<ArrayList<Erreserba>> getErreserbak(int userId);


    @GET("erreserba/user/{id}")
    Call<ArrayList<Erreserba>> getErreserbaById(@Path("id") int id);
}
