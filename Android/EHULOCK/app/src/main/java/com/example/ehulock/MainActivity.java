package com.example.ehulock;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.activity.ComponentActivity;

public class MainActivity extends ComponentActivity {

   
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
                Intent intent = new Intent(MainActivity.this, WebviewActivity.class);
                startActivity(intent);     

    }

}

