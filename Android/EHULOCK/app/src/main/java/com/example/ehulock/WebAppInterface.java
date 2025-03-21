package com.example.ehulock;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class WebAppInterface {
    Context context;

    // Constructor to pass the context
    WebAppInterface(Context context) {
        this.context = context;
    }

    // Expose this method to JavaScript
    @JavascriptInterface
    public void setUserId(String userId) {
        // Handle the userId in native Android code
        SharedPreferences sharedPref = context.getSharedPreferences("EHULOCK", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("userId", userId);
        editor.apply();
        Log.d("WebAppInterface", "Received userId: " + userId);

        // You can now use the userId for NFC or other native processes
        // For example, start an NFC process here
    }
}
