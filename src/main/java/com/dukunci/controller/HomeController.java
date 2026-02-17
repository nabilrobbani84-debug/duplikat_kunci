package com.dukunci.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("appName", "DUKUN DUPLIKAT KUNCI");
        model.addAttribute("phone", "+62 858-9428-3295");
        model.addAttribute("address", "Jl. Wibawa Mukti II Kp. Pedurenan, RT.001/RW.006, Jatiasih, Bekasi");
        
        List<ServiceItem> services = Arrays.asList(
            new ServiceItem("Duplikat Kunci Mobil", "Ahli duplikat kunci mobil segala merek, immobilizer & smart key.", "fas fa-car"),
            new ServiceItem("Kunci Brankas", "Buka dan perbaikan kunci brankas macet atau lupa kombinasi.", "fas fa-lock"),
            new ServiceItem("Duplikat Remote", "Duplikat remote mobil, garasi, dan pagar otomatis.", "fas fa-wifi"),
            new ServiceItem("Kunci Rumah & Pintu", "Solusi kunci pintu rumah macet, hilang, atau patah.", "fas fa-home"),
            new ServiceItem("Immobilizer", "Spesialis pemrograman ulang chip immobilizer jika hilang.", "fas fa-microchip"),
            new ServiceItem("Layanan Panggilan", "Siap datang ke lokasi Anda 24 jam untuk keadaan darurat.", "fas fa-phone-volume")
        );
        
        model.addAttribute("services", services);
        return "index";
    }

    public static class ServiceItem {
        private String title;
        private String description;
        private String icon;

        public ServiceItem(String title, String description, String icon) {
            this.title = title;
            this.description = description;
            this.icon = icon;
        }

        public String getTitle() { return title; }
        public String getDescription() { return description; }
        public String getIcon() { return icon; }
    }
}
