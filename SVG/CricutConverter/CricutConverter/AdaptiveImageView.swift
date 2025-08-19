// AdaptiveImageView.swift - Complete Image Scaling Solution
import SwiftUI
import UIKit

struct AdaptiveImageView: View {
    let image: UIImage?
    @Binding var threshold: Float
    @Binding var blurRadius: Float
    let onParameterChange: (Float, Float) -> Void
    
    @State private var scale: CGFloat = 1.0
    @State private var offset: CGSize = .zero
    @State private var showZoomControls = false
    @State private var lastScaleValue: CGFloat = 1.0
    @State private var isZooming = false
    
    var body: some View {
        GeometryReader { geometry in
            ZStack {
                // Background
                Color.black
                    .ignoresSafeArea()
                
                // Main image with gestures
                if let image = image {
                    ZStack {
                        // Image with zoom and pan
                        AdaptiveImageDisplay(
                            image: image,
                            scale: $scale,
                            offset: $offset,
                            threshold: $threshold,
                            blurRadius: $blurRadius,
                            onParameterChange: onParameterChange,
                            isZooming: $isZooming
                        )
                        .clipped()
                        
                        // Zoom controls overlay
                        if showZoomControls {
                            ZoomControlsOverlay(
                                scale: $scale,
                                offset: $offset,
                                onReset: resetView,
                                onFitToScreen: fitToScreen,
                                geometry: geometry
                            )
                        }
                    }
                } else {
                    // Placeholder when no image
                    ImagePlaceholder()
                }
            }
            .gesture(
                TapGesture(count: 2)
                    .onEnded {
                        withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) {
                            if scale > 1.0 {
                                resetView()
                            } else {
                                scale = 2.0
                                offset = .zero
                            }
                        }
                    }
            )
            .onAppear {
                withAnimation(.easeInOut(duration: 1.0)) {
                    showZoomControls = true
                }
            }
        }
    }
    
    private func resetView() {
        withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) {
            scale = 1.0
            offset = .zero
        }
    }
    
    private func fitToScreen() {
        withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) {
            scale = 1.0
            offset = .zero
        }
    }
}

struct AdaptiveImageDisplay: UIViewRepresentable {
    let image: UIImage
    @Binding var scale: CGFloat
    @Binding var offset: CGSize
    @Binding var threshold: Float
    @Binding var blurRadius: Float
    let onParameterChange: (Float, Float) -> Void
    @Binding var isZooming: Bool
    
    func makeUIView(context: Context) -> AdaptiveImageUIView {
        let view = AdaptiveImageUIView()
        view.delegate = context.coordinator
        return view
    }
    
    func updateUIView(_ uiView: AdaptiveImageUIView, context: Context) {
        uiView.image = image
        uiView.currentScale = scale
        uiView.currentOffset = offset
        uiView.currentThreshold = threshold
        uiView.currentBlur = blurRadius
    }
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    class Coordinator: AdaptiveImageDelegate {
        let parent: AdaptiveImageDisplay
        
        init(_ parent: AdaptiveImageDisplay) {
            self.parent = parent
        }
        
        func didUpdateScale(_ scale: CGFloat) {
            parent.scale = scale
        }
        
        func didUpdateOffset(_ offset: CGSize) {
            parent.offset = offset
        }
        
        func didUpdateParameters(threshold: Float, blur: Float) {
            parent.onParameterChange(threshold, blur)
        }
        
        func didStartZooming() {
            parent.isZooming = true
        }
        
        func didEndZooming() {
            parent.isZooming = false
        }
    }
}

protocol AdaptiveImageDelegate: AnyObject {
    func didUpdateScale(_ scale: CGFloat)
    func didUpdateOffset(_ offset: CGSize)
    func didUpdateParameters(threshold: Float, blur: Float)
    func didStartZooming()
    func didEndZooming()
}

class AdaptiveImageUIView: UIView {
    weak var delegate: AdaptiveImageDelegate?
    
    var image: UIImage? {
        didSet {
            setupImageView()
            calculateOptimalScale()
        }
    }
    
    var currentScale: CGFloat = 1.0 {
        didSet {
            updateImageTransform()
        }
    }
    
    var currentOffset: CGSize = .zero {
        didSet {
            updateImageTransform()
        }
    }
    
    var currentThreshold: Float = 128
    var currentBlur: Float = 2
    
    private let imageView = UIImageView()
    private let scrollView = UIScrollView()
    
    // Gesture recognizers
    private var panGesture: UIPanGestureRecognizer!
    private var pinchGesture: UIPinchGestureRecognizer!
    
    // Radiology controls state
    private var isRadiologyMode = false
    private var radiologyStartPoint: CGPoint = .zero
    private var radiologyStartThreshold: Float = 128
    private var radiologyStartBlur: Float = 2
    
    // Device-specific settings
    private var deviceScaleFactor: CGFloat {
        switch UIDevice.current.userInterfaceIdiom {
        case .phone:
            return UIScreen.main.bounds.width < 400 ? 0.8 : 1.0
        case .pad:
            return 1.2
        default:
            return 1.0
        }
    }
    
    private var maxScale: CGFloat {
        switch UIDevice.current.userInterfaceIdiom {
        case .phone:
            return 4.0
        case .pad:
            return 6.0
        default:
            return 4.0
        }
    }
    
    private var minScale: CGFloat {
        return 0.5
    }
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupView()
        setupGestures()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupView()
        setupGestures()
    }
    
    private func setupView() {
        backgroundColor = .black
        
        // Setup scroll view (for smooth zooming)
        scrollView.delegate = self
        scrollView.minimumZoomScale = minScale
        scrollView.maximumZoomScale = maxScale
        scrollView.showsVerticalScrollIndicator = false
        scrollView.showsHorizontalScrollIndicator = false
        scrollView.backgroundColor = .clear
        addSubview(scrollView)
        
        // Setup image view
        imageView.contentMode = .scaleAspectFit
        imageView.backgroundColor = .clear
        scrollView.addSubview(imageView)
        
        // Setup constraints
        setupConstraints()
    }
    
    private func setupConstraints() {
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        imageView.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            scrollView.topAnchor.constraint(equalTo: topAnchor),
            scrollView.leadingAnchor.constraint(equalTo: leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: bottomAnchor),
            
            imageView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            imageView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            imageView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            imageView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            imageView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),
            imageView.heightAnchor.constraint(equalTo: scrollView.heightAnchor)
        ])
    }
    
    private func setupGestures() {
        // Pan gesture for radiology controls (when not zoomed)
        panGesture = UIPanGestureRecognizer(target: self, action: #selector(handlePanGesture(_:)))
        panGesture.delegate = self
        addGestureRecognizer(panGesture)
        
        // Pinch gesture for zooming
        pinchGesture = UIPinchGestureRecognizer(target: self, action: #selector(handlePinchGesture(_:)))
        pinchGesture.delegate = self
        addGestureRecognizer(pinchGesture)
    }
    
    private func setupImageView() {
        guard let image = image else { return }
        
        imageView.image = image
        calculateOptimalScale()
    }
    
    private func calculateOptimalScale() {
        guard let image = image else { return }
        
        let viewSize = bounds.size
        let imageSize = image.size
        
        guard viewSize.width > 0 && viewSize.height > 0 else { return }
        
        // Calculate scale to fit image in view
        let scaleX = viewSize.width / imageSize.width
        let scaleY = viewSize.height / imageSize.height
        let optimalScale = min(scaleX, scaleY) * deviceScaleFactor
        
        // Set as initial scale
        scrollView.zoomScale = optimalScale
        currentScale = optimalScale
        
        // Center the image
        centerImage()
    }
    
    private func centerImage() {
        let scrollViewSize = scrollView.bounds.size
        let imageSize = imageView.frame.size
        
        let horizontalInset = max(0, (scrollViewSize.width - imageSize.width) / 2)
        let verticalInset = max(0, (scrollViewSize.height - imageSize.height) / 2)
        
        scrollView.contentInset = UIEdgeInsets(
            top: verticalInset,
            left: horizontalInset,
            bottom: verticalInset,
            right: horizontalInset
        )
    }
    
    private func updateImageTransform() {
        // This is handled by the scroll view
    }
    
    @objc private func handlePanGesture(_ gesture: UIPanGestureRecognizer) {
        // Only handle radiology controls when not zoomed
        guard scrollView.zoomScale <= 1.1 else { return }
        
        let translation = gesture.translation(in: self)
        
        switch gesture.state {
        case .began:
            isRadiologyMode = true
            radiologyStartPoint = gesture.location(in: self)
            radiologyStartThreshold = currentThreshold
            radiologyStartBlur = currentBlur
            delegate?.didStartZooming()
            
        case .changed:
            guard isRadiologyMode else { return }
            
            // Calculate parameter changes with device-specific sensitivity
            let sensitivity = deviceScaleFactor * 0.5
            let thresholdDelta = Float(translation.x) * Float(sensitivity)
            let blurDelta = Float(-translation.y) * Float(sensitivity) * 0.02
            
            let newThreshold = max(0, min(255, radiologyStartThreshold + thresholdDelta))
            let newBlur = max(0, min(10, radiologyStartBlur + blurDelta))
            
            currentThreshold = newThreshold
            currentBlur = newBlur
            
            delegate?.didUpdateParameters(threshold: newThreshold, blur: newBlur)
            
        case .ended, .cancelled:
            isRadiologyMode = false
            delegate?.didEndZooming()
            
        default:
            break
        }
    }
    
    @objc private func handlePinchGesture(_ gesture: UIPinchGestureRecognizer) {
        switch gesture.state {
        case .began:
            delegate?.didStartZooming()
            
        case .changed:
            let newScale = scrollView.zoomScale * gesture.scale
            let clampedScale = max(minScale, min(maxScale, newScale))
            scrollView.zoomScale = clampedScale
            currentScale = clampedScale
            delegate?.didUpdateScale(clampedScale)
            gesture.scale = 1.0
            
        case .ended, .cancelled:
            delegate?.didEndZooming()
            
        default:
            break
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        centerImage()
    }
}

// MARK: - UIScrollViewDelegate
extension AdaptiveImageUIView: UIScrollViewDelegate {
    func viewForZooming(in scrollView: UIScrollView) -> UIView? {
        return imageView
    }
    
    func scrollViewDidZoom(_ scrollView: UIScrollView) {
        centerImage()
        currentScale = scrollView.zoomScale
        delegate?.didUpdateScale(scrollView.zoomScale)
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        let offset = CGSize(width: scrollView.contentOffset.x, height: scrollView.contentOffset.y)
        delegate?.didUpdateOffset(offset)
    }
}

// MARK: - UIGestureRecognizerDelegate
extension AdaptiveImageUIView: UIGestureRecognizerDelegate {
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldRecognizeSimultaneouslyWith otherGestureRecognizer: UIGestureRecognizer) -> Bool {
        // Allow pan and pinch to work together
        return true
    }
    
    func gestureRecognizer(_ gestureRecognizer: UIGestureRecognizer, shouldReceive touch: UITouch) -> Bool {
        // Only handle pan for radiology when not zoomed
        if gestureRecognizer == panGesture {
            return scrollView.zoomScale <= 1.1
        }
        return true
    }
}

struct ZoomControlsOverlay: View {
    @Binding var scale: CGFloat
    @Binding var offset: CGSize
    let onReset: () -> Void
    let onFitToScreen: () -> Void
    let geometry: GeometryProxy
    
    @State private var showControls = true
    
    var body: some View {
        VStack {
            // Top controls
            HStack {
                Spacer()
                
                ZoomPercentageDisplay(scale: scale)
                    .padding(.top, 20)
                    .padding(.trailing, 20)
            }
            
            Spacer()
            
            // Bottom controls
            if showControls {
                HStack(spacing: 20) {
                    ZoomButton(
                        icon: "minus.magnifyingglass",
                        action: { adjustZoom(by: 0.8) }
                    )
                    
                    ZoomButton(
                        icon: "plus.magnifyingglass",
                        action: { adjustZoom(by: 1.2) }
                    )
                    
                    ZoomButton(
                        icon: "arrow.up.left.and.arrow.down.right",
                        action: onFitToScreen
                    )
                    
                    ZoomButton(
                        icon: "gobackward",
                        action: onReset
                    )
                }
                .padding(.bottom, 30)
                .transition(.move(edge: .bottom).combined(with: .opacity))
            }
        }
        .onTapGesture {
            withAnimation(.spring()) {
                showControls.toggle()
            }
        }
    }
    
    private func adjustZoom(by factor: CGFloat) {
        let newScale = scale * factor
        let clampedScale = max(0.5, min(6.0, newScale))
        
        withAnimation(.spring(response: 0.3, dampingFraction: 0.8)) {
            scale = clampedScale
        }
    }
}

struct ZoomPercentageDisplay: View {
    let scale: CGFloat
    
    var body: some View {
        Text("\(Int(scale * 100))%")
            .font(.system(size: 16, weight: .semibold, design: .monospaced))
            .foregroundColor(.white)
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(
                RoundedRectangle(cornerRadius: 8)
                    .fill(Color.black.opacity(0.7))
            )
    }
}

struct ZoomButton: View {
    let icon: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Image(systemName: icon)
                .font(.system(size: 20, weight: .medium))
                .foregroundColor(.white)
                .frame(width: 50, height: 50)
                .background(
                    Circle()
                        .fill(Color.black.opacity(0.7))
                        .overlay(
                            Circle()
                                .stroke(Color.white.opacity(0.3), lineWidth: 1)
                        )
                )
        }
        .scaleEffect(1.0)
        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: 1.0)
    }
}

struct ImagePlaceholder: View {
    var body: some View {
        VStack(spacing: 20) {
            Image(systemName: "photo.badge.plus")
                .font(.system(size: 80))
                .foregroundColor(.gray)
            
            VStack(spacing: 8) {
                Text("No Image Loaded")
                    .font(.title2)
                    .fontWeight(.medium)
                    .foregroundColor(.white)
                
                Text("Select an image to begin processing")
                    .font(.body)
                    .foregroundColor(.gray)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}
