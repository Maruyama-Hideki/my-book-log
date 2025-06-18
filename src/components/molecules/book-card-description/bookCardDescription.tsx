import { ArrowLeft, Star } from "lucide-react";
import React from "react";

export const BookCardDescription = () => {
  const book = {
    title: "人工知能は人間を超えるか",
    author: "松尾 豊",
    publisher: "KADOKAWA",
    publishDate: "2015年3月10日",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    rating: 4.3,
    reviewCount: 1247,
    synopsis:
      "人工知能研究の第一人者が、AIの現在と未来を分かりやすく解説した話題の一冊。ディープラーニングの仕組みから、AIが社会に与える影響まで、幅広い視点で人工知能の可能性を探る。技術者でなくても理解できるよう、専門用語を使わずに書かれており、AI時代を生きる全ての人に読んでもらいたい必読書です。",
    reviews: [
      {
        id: 1,
        user: "田中太郎",
        rating: 5,
        comment:
          "AI初心者でも理解しやすく、とても勉強になりました。これからの時代に必要な知識が得られる素晴らしい本です。",
        date: "2024年2月15日",
      },
      {
        id: 2,
        user: "佐藤花子",
        rating: 4,
        comment:
          "専門的な内容を分かりやすく説明していて、AIの基礎を学ぶのに最適です。ただし、もう少し具体例があると良かったです。",
        date: "2024年1月28日",
      },
      {
        id: 3,
        user: "山田次郎",
        rating: 4,
        comment:
          "AIの現状と将来性について深く考えさせられました。技術の進歩とともに読み返したい一冊です。",
        date: "2024年1月10日",
      },
    ],
  };
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-blue-500 text-blue-500" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <Star className="w-4 h-4 text-gray-300 absolute" />
            <div className="overflow-hidden w-2">
              <Star className="w-4 h-4 fill-blue-500 text-blue-500 absolute" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            書籍一覧に戻る
          </button>
        </div>
      </header>
      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 左側: 本のカバー画像 */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-80 h-[480px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/10"></div>
            </div>
          </div>
          {/* 右側: 本の詳細情報 */}
          <div className="space-y-8">
            {/* タイトルと著者 */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600">著者: {book.author}</p>
            </div>
            {/* 出版情報 */}
            <div className="flex flex-col space-y-2 text-gray-600">
              <p>出版社: {book.publisher}</p>
              <p>出版日: {book.publishDate}</p>
            </div>
            {/* 評価 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {renderStars(book.rating)}
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {book.rating}
              </span>
              <span className="text-gray-600">
                ({book.reviewCount.toLocaleString()}件のレビュー)
              </span>
            </div>
            {/* あらすじ */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">あらすじ</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {book.synopsis}
              </p>
            </div>
          </div>
        </div>
        {/* レビューセクション */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            読者のレビュー
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {book.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{review.user}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {review.comment}
                </p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
