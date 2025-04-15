package com.example.ehulock;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.nfc.NfcAdapter;
import android.nfc.NfcManager;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.RequiresPermission;
import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import androidx.core.content.ContextCompat;

import java.text.SimpleDateFormat;
import java.util.Date;

import kotlin.text.UStringsKt;

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


    }

    @JavascriptInterface
    public String getNotificationToken(){
        SharedPreferences sharedPref = context.getSharedPreferences("EHULOCK", Context.MODE_PRIVATE);
        return sharedPref.getString("notification_token", "NOTOKEN");
    }
    @RequiresPermission(Manifest.permission.POST_NOTIFICATIONS)
    @JavascriptInterface
    public void showNotification(String title, String message) {
        // Create notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, "channel_id")
                .setSmallIcon(R.drawable.ic_launcher_foreground)
                .setContentTitle(title)
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        notificationManager.notify(1, builder.build());
    }


    @JavascriptInterface
    public void askForNFCActivation(){
        NfcManager manager = (NfcManager) context.getSystemService(Context.NFC_SERVICE);
        NfcAdapter adapter = manager.getDefaultAdapter();
        if (adapter != null) {
            if(!(adapter.isEnabled())){
                Toast.makeText(context,"Aktibatu mugikorraren NFCa", Toast.LENGTH_SHORT).show();
            }
        }else{
            Toast.makeText(context,"Mugikorra ez du NFCrik", Toast.LENGTH_SHORT).show();

        }
    }
}
