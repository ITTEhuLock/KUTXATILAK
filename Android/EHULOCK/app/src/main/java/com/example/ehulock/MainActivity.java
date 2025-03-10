package com.example.ehulock;

import android.os.Bundle;
import android.os.Handler;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import androidx.activity.ComponentActivity;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import com.example.ehulock.model.Erreserba;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;


public class MainActivity extends ComponentActivity {
    private ListView listView;
    private SwipeRefreshLayout swipeRefreshLayout;
    private ArrayList<Erreserba> erreserbak;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
        listView = findViewById(R.id.listView);
        datuakLortu();


        swipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                new Handler().postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        datuakLortu();
                        swipeRefreshLayout.setRefreshing(false);
                    }
                }, 500);
            }
        });
    }

    private void datuakLortu(){
        ehulockAPI api = RetrofitClient.getRetrofit().create(ehulockAPI.class);
        int idUser = 1;
        Call<ArrayList<Erreserba>> call = api.getErreserbaById(idUser);
        call.enqueue(new Callback<ArrayList<Erreserba>>() {
            @Override
            public void onResponse(Call<ArrayList<Erreserba>> call, Response<ArrayList<Erreserba>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    erreserbak = response.body();
                    erreserbakBistaratu();
                }
            }

            @Override
            public void onFailure(Call<ArrayList<Erreserba>> call, Throwable t) {
                t.printStackTrace();
            }

        });
    }
    private void erreserbakBistaratu () {

        ArrayAdapter<Erreserba> adapter = new ErreserbaAdapter(
                this, erreserbak
        );
        listView.setAdapter(adapter);
    }

}

