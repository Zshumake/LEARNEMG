//
//  UltimateSVGConverterApp.swift
//  Ultimate SVG Converter
//
//  Main app entry point
//

import SwiftUI

@main
struct UltimateSVGConverterApp: App {
    @StateObject private var appSettings = AppSettings.load()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(appSettings)
                .preferredColorScheme(.dark) // Force dark mode for professional look
                .onAppear {
                    setupApp()
                }
        }
    }
    
    private func setupApp() {
        // Configure app-wide settings
        setupNavigationBarAppearance()
        setupTabBarAppearance()
        
        // Log app startup
        print("Ultimate SVG Converter started")
        print("Device: \(UIDevice.current.model)")
        print("iOS Version: \(UIDevice.current.systemVersion)")
        print("App Version: \(Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "Unknown")")
    }
    
    private func setupNavigationBarAppearance() {
        let appearance = UINavigationBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = UIColor.systemBackground
        appearance.titleTextAttributes = [
            .foregroundColor: UIColor.label,
            .font: UIFont.systemFont(ofSize: 17, weight: .semibold)
        ]
        appearance.largeTitleTextAttributes = [
            .foregroundColor: UIColor.label,
            .font: UIFont.systemFont(ofSize: 34, weight: .bold)
        ]
        
        UINavigationBar.appearance().standardAppearance = appearance
        UINavigationBar.appearance().scrollEdgeAppearance = appearance
        UINavigationBar.appearance().compactAppearance = appearance
    }
    
    private func setupTabBarAppearance() {
        let appearance = UITabBarAppearance()
        appearance.configureWithOpaqueBackground()
        appearance.backgroundColor = UIColor.systemBackground
        
        UITabBar.appearance().standardAppearance = appearance
        UITabBar.appearance().scrollEdgeAppearance = appearance
    }
}