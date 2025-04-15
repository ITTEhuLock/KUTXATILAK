package com.example.ehulock;


import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.nfc.cardemulation.HostApduService;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.WebView;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

public class GiltzaModulua extends HostApduService {

    @Override
    public byte[] processCommandApdu(byte[] commandApdu, Bundle extras) {
        Log.d("HCE", "processCommandApdu");
        Log.d("HCE", Arrays.toString(commandApdu));

        SharedPreferences sharedPref = getSharedPreferences("EHULOCK", Context.MODE_PRIVATE);
        String userId = sharedPref.getString("userId", "0");
        byte[] userIdData = userId.getBytes(); ; // Optional FCI data
        Log.d("HCE", userId);
        Log.d("HCE", Arrays.toString(userIdData));
        byte[] response = new byte[userIdData.length + 2];
        System.arraycopy(userIdData, 0, response, 0, userIdData.length);
        response[userIdData.length] = (byte) 0x90; // SW1
        response[userIdData.length + 1] = (byte) 0x00; // SW2
        Log.d("HCE", Arrays.toString(response));
        return response;
    }

    @Override
    public void onDeactivated(int reason) {
        Log.d("HCE", "Deactivated: " + reason);
    }
}