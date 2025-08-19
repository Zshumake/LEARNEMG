// ErrorRecoveryView.swift - Enhanced Error Handling
import SwiftUI

struct ErrorRecoveryView: View {
    let error: CricutError
    let onRetry: () -> Void
    let onHelp: () -> Void
    let onDismiss: () -> Void
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                Spacer()
                
                // Error Icon
                Image(systemName: iconForError(error))
                    .font(.system(size: 80))
                    .foregroundColor(.red)
                
                // Error Title
                Text(titleForError(error))
                    .font(.title2)
                    .fontWeight(.bold)
                    .multilineTextAlignment(.center)
                
                // Error Description
                Text(error.errorDescription ?? "An unexpected error occurred")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                
                // Recovery Suggestion
                if let suggestion = error.recoverySuggestion {
                    HStack {
                        Image(systemName: "lightbulb.fill")
                            .foregroundColor(.orange)
                        Text(suggestion)
                            .font(.callout)
                            .multilineTextAlignment(.leading)
                        Spacer()
                    }
                    .padding()
                    .background(Color.orange.opacity(0.1))
                    .cornerRadius(12)
                    .padding(.horizontal)
                }
                
                Spacer()
                
                // Action Buttons
                VStack(spacing: 16) {
                    Button(action: onRetry) {
                        HStack {
                            Image(systemName: "arrow.clockwise")
                            Text("Try Again")
                        }
                    }
                    .buttonStyle(PrimaryButtonStyle())
                    .padding(.horizontal)
                    
                    HStack(spacing: 12) {
                        Button(action: onHelp) {
                            HStack {
                                Image(systemName: "questionmark.circle")
                                Text("Get Help")
                            }
                        }
                        .buttonStyle(SecondaryButtonStyle())
                        
                        Button(action: onDismiss) {
                            HStack {
                                Image(systemName: "xmark.circle")
                                Text("Cancel")
                            }
                        }
                        .buttonStyle(TertiaryButtonStyle())
                    }
                    .padding(.horizontal)
                }
                
                Spacer()
            }
            .navigationTitle("Error")
            .navigationBarTitleDisplayMode(.large)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        onDismiss()
                    }
                }
            }
        }
    }
    
    private func iconForError(_ error: CricutError) -> String {
        switch error {
        case .memoryPressure:
            return "memorychip.fill"
        case .invalidImageFormat:
            return "photo.badge.exclamationmark"
        case .fileAccessDenied:
            return "lock.fill"
        case .exportFailed:
            return "square.and.arrow.up.trianglebadge.exclamationmark"
        default:
            return "exclamationmark.triangle.fill"
        }
    }
    
    private func titleForError(_ error: CricutError) -> String {
        switch error {
        case .memoryPressure:
            return "Image is Too Large"
        case .invalidImageFormat:
            return "Format Not Supported"
        case .fileAccessDenied:
            return "Photo Access Required"
        case .exportFailed:
            return "Export Failed"
        default:
            return "Something Went Wrong"
        }
    }
}

// MARK: - Button Styles
struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.headline)
            .foregroundColor(.white)
            .padding(.vertical, 16)
            .padding(.horizontal, 24)
            .frame(maxWidth: .infinity)
            .background(Color(.systemGray6))
            .cornerRadius(10)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}(maxWidth: .infinity)
            .background(
                LinearGradient(
                    gradient: Gradient(colors: [Color.blue, Color.blue.opacity(0.8)]),
                    startPoint: .top,
                    endPoint: .bottom
                )
            )
            .cornerRadius(12)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

struct SecondaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.subheadline)
            .foregroundColor(.blue)
            .padding(.vertical, 12)
            .padding(.horizontal, 20)
            .frame(maxWidth: .infinity)
            .background(Color.blue.opacity(0.1))
            .cornerRadius(10)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}

struct TertiaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(.subheadline)
            .foregroundColor(.secondary)
            .padding(.vertical, 12)
            .padding(.horizontal, 20)
            .frame
